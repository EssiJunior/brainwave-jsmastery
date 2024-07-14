import Image from "next/image";
import { loading } from "@/public/assets";

const Generating = ({ className }) => {
    return (
        <div
            className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${className || ""
                } text-base`}
        >
            <Image
                width={20}
                height={20}
                // sizes="100vw"
                // style={{ width: '100%', height: '100%' }}
                className="w-5 h-5 mr-4"
                src={loading}
                alt="Loading"
            />
            AI is generating
        </div>
    );
};

export default Generating;