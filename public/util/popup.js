import { popUpMessage, popUpStatus, popUpVisible } from "public/redux/actions";
import { messagesError, messagesSuccess } from "./messages";
const successIcon = require("../img/successIcon.png");
const failIcon = require("../img/failIcon.png");
const hidden = "h-screen h-min-screen hidden w-full fixed justify-center items-center";
const show =
  "h-screen h-min-screen flex w-full fixed justify-center items-center bg-slate-600 bg-opacity-50";
const ShowMethod = (dispatch, message, status) => {
  dispatch(popUpMessage(message));
  dispatch(popUpStatus(status));
  dispatch(popUpVisible(show));
}
const HideMethod = (dispatch) => {
  dispatch(popUpVisible(hidden));
}
const checkStatus = (dispatch, router, title, status, path) => {
  switch (status) {
    case 1:
      ShowMethod(dispatch, messagesError.E3001, false);
      return;
    case 2:
      ShowMethod(dispatch, messagesSuccess.I0008(title), true);
      setTimeout(() => {
        router.push(path);
      }, 500);
      return
    case 3:
      ShowMethod(dispatch, messagesError.E3002, false);
      return;
    case 4:
      ShowMethod(dispatch, messagesError.E3003, false);
      return;
    default:
      return;
  }
}
export { successIcon, failIcon, hidden, show, checkStatus, ShowMethod, HideMethod };
