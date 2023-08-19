import { getCookie } from "cookies-next";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";

export default function UpdateAvatar() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const token = getCookie("USER");

    const convertFileToBase64 = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    resolve(event.target.result as string);
                } else {
                    reject(new Error("Event target is null."));
                }
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    };

    const upload: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.currentTarget;

        const file = form.image.files[0];
        if (!file) {
            return;
        }

        // Compress the image before uploading
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);

            const formData = new FormData();
            formData.append("image", compressedFile);

            const base64Image = await convertFileToBase64(compressedFile);

            const body = {
                id: token,
                pic: base64Image,
            };


            const response = await fetch("/api/User/Settings/AddProfilePic", {
                method: "POST",
                body: JSON.stringify(body),
            }).then(res => {
                if (res.status === 200) {
                    // Success: do something
                    router.push("/DashBoard");
                } else {
                    // Handle error
                }
            })


        } catch (error) {
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    return (
        <DefaultLayout>
            <form onSubmit={upload}>
                <div>
                    <div className="w-full">
                        <div className="form-control w-full mx-auto">
                            <label>
                                <span className="label-text text-black text-2xl">Upload</span>
                                <div className="text-sm text-gray-500 font-bold">
                                    Only upload image files
                                </div>
                            </label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*" // Allow only image files
                                className="input input-bordered w-full input-primary"
                            />
                        </div>
                    </div>
                </div>
                <button
                    className="w-full btn-primary btn my-10"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "SUBMIT"}
                </button>
            </form>
        </DefaultLayout>
    );
}
