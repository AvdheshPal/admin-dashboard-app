import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { toast } from "sonner";
import Button from "../../../components/Button";
import "leaflet/dist/leaflet.css";

interface FileUploadProps {
    onNext: (data: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onNext }) => {
    const { handleSubmit, setValue } = useForm();
    const [files, setFiles] = useState<File[]>([]);
    const [dropzoneError, setDropzoneError] = useState<string | null>(null);

    const handleFileChange = (newFiles: File[]) => {
        if (newFiles.length + files.length > 5) {
            setDropzoneError("You can upload up to 5 files only.");
        } else {
            setDropzoneError(null);
            setFiles((prevFiles) => {
                const updatedFiles = [...prevFiles, ...newFiles];
                setValue("files", updatedFiles);
                return updatedFiles;
            });
        }
    };

    const removeFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        setValue("files", updatedFiles);
        setDropzoneError(null);
    };

    const onSubmit = (data: any) => {
        if (!data?.files || data.files.length === 0) {
            toast.error("Please select at least 1 file");
            return;
        }

        onNext(data);
        toast.success("Form Submitted Successfully");
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => handleFileChange(acceptedFiles),
        accept: {
            "application/pdf": [".pdf"],
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
        },
        maxFiles: 5,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-6">
            {/* Drag-and-Drop Upload Section */}
            <div>
                <label className="text-xl font-semibold">Upload</label>
                <div
                    {...getRootProps()}
                    className="w-full p-6 mt-5 border-2 border-dashed rounded-lg text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                    <input {...getInputProps()} />
                    <p className="text-lg">
                        Drag & drop files or <span className="text-blue-500 underline">Browse</span>
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Supported formats: JPEG, PNG, PDF (Max: 5 files)
                    </p>
                </div>
                {dropzoneError && <p className="text-red-500 mt-2">{dropzoneError}</p>}
            </div>

            {/* Upload Progress Section */}
            {files.length > 0 && (
                <div>
                    <h4 className="font-semibold text-lg mb-2">Uploading - {files.length}/5 files</h4>
                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-green-100 border border-green-400 rounded-lg"
                            >
                                <span className="text-sm truncate">{file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="text-red-500 hover:text-red-700 font-bold"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <Button
                type="submit"
                className="w-full"
            >
                UPLOAD FILES
            </Button>

            <GeolocationMap />
        </form>
    );
};

export default FileUpload;


const GeolocationMap: React.FC = () => {
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lon: longitude });
                    setLoading(false);
                },
                () => {
                    console.warn("Geolocation not supported or permission denied.");
                    setLoading(false);
                }
            );
        } else {
            console.warn("Geolocation is not available in this browser.");
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <p>Loading your location...</p>;
    }

    if (!location) {
        return <p>Unable to fetch your location. Please check your browser settings.</p>;
    }

    return (
        <div className="mt-10">
            <h4 className="text-lg font-semibold mb-2">Geolocation on Map</h4>
            <MapContainer
                center={[location.lat, location.lon]}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker location={location} />
            </MapContainer>
        </div>
    );
};

const LocationMarker: React.FC<{ location: { lat: number; lon: number } }> = ({ location }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([location.lat, location.lon], map.getZoom());
    }, [location, map]);

    return (
        <Marker position={[location.lat, location.lon]}>
            <Popup>
                You are here: {`Lat: ${location.lat}, Long: ${location.lon}`}
            </Popup>
        </Marker>
    );
};