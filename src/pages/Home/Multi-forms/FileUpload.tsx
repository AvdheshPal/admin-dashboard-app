import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";  // Importing react-dropzone
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { toast } from "sonner";

interface FileUploadProps {
    onNext: (data: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onNext }) => {
    const { handleSubmit, setValue } = useForm();
    const [files, setFiles] = useState<File[]>([]);
    const [dropzoneError, setDropzoneError] = useState<string | null>(null);

    // Handle file change (from dropzone or file input)
    const handleFileChange = (newFiles: File[]) => {
        if (newFiles.length + files.length > 5) {
            setDropzoneError("You can upload up to 5 files only.");
        } else {
            setDropzoneError(null);  // Reset error if file limit is not exceeded
            setFiles((prevFiles) => {
                const updatedFiles = [...prevFiles, ...newFiles];
                setValue("files", updatedFiles); // Register files with react-hook-form
                return updatedFiles;
            });
        }
    };

    // Remove file from the list
    const removeFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        setValue("files", updatedFiles); // Update react-hook-form
        setDropzoneError(null); // Reset error if files are removed
    };

    const onSubmit = (data: any) => {
        if (!data?.files || data.files.length === 0) {
          toast.error('Please select at least 1 file');
          return;
        }
        
        console.log(data);
        onNext(data);
      };
      

    // Setting up the dropzone options
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => handleFileChange(acceptedFiles),
        accept: {
            "application/pdf": [".pdf"],
        },
        maxFiles: 5,  // Limit to 5 files
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label>File Upload (PNG, PDF; Max 5 files)</label>
                <div
                    {...getRootProps()}
                    className="w-full p-4 border-2 border-dashed rounded-md text-center cursor-pointer"
                >
                    <input
                        {...getInputProps()}
                    />
                    <p>Drag & drop files here, or click to select files</p>
                </div>

                {dropzoneError && <p className="text-red-500">{dropzoneError}</p>}
            </div>

            {files.length > 0 && (
                <div>
                    <h4 className="font-semibold">Uploaded Files:</h4>
                    <div className="flex space-x-4">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-200 p-2 rounded-md w-32 h-32">
                                <span className="text-sm text-ellipsis overflow-hidden">{file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <GeolocationMap />

            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Next
            </button>
        </form>
    );
};

export default FileUpload;




const GeolocationMap: React.FC = () => {
    const [location, setLocation] = useState<{ lat: number; lon: number }>({ lat: 0, lon: 0 });

    useEffect(() => {
        // Get user's geolocation when the component mounts
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lon: longitude });
                },
                () => {
                    setLocation({ lat: 0, lon: 0 });
                }
            );
        }
    }, []);

    return (
        <div>
            <h4 className="text-lg font-semibold">Geolocation on Map</h4>
            <MapContainer center={[location.lat, location.lon] as [number, number]} zoom={13} style={{ height: "300px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[location.lat, location.lon] as [number, number]}>
                    <Popup>
                        You are here: {`Lat: ${location.lat}, Long: ${location.lon}`}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};
