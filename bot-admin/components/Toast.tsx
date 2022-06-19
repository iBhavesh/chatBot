import {toast} from "react-toastify"

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { resetMessage } from "../redux/uiSlice";

function Toast() {
	const {show,message,type} = useAppSelector(state => state.ui);
	const dispatch = useAppDispatch()

	const showSuccess = () => {
		toast.success(message, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			draggable: true,
			pauseOnFocusLoss:false,
		});
		dispatch(resetMessage());
	}

	const showError = () => {
		toast.error(message, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			draggable: true,
			pauseOnFocusLoss:false,
		});
		dispatch(resetMessage());
	}
	if(show && type === "success") showSuccess();
	if(show && type === "error") showSuccess();

	return <></>;
}

export default Toast;