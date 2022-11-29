import ClosePopUp from "./ClosePopUp";

function AddRewardPopUp({ children, close }) {
    return (
        <div
            className={`w-3/4 h-[60%] max-w-xl bg-white border-4
            shadow-xl shadow-slate-500 rounded-3xl flex flex-col items-center justify-center px-2`}
        >
            <ClosePopUp closeAction={close} />
            <div className="w-full h-full flex flex-col items-center justify-center">{children}</div>
        </div>
    );
}

export default AddRewardPopUp;
