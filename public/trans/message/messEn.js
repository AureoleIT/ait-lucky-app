const messEn = {
    messagesSuccess: {
      I0001: "Sign up successfully",
      I0002: "Sign in successfully",
      I0003: "Update successfully",
      I0004: "Delete successfully",
      I0005: "Upload file successfully",
      I0006: "Add successfully",
      I0007: (a) => {
        return "Create " + a + " successfully ";
      },
      I0008: (a) => {
        return "Welcome to  " + a + "event";
      },
      I0009: "Moving to waiting line",
      I0010: "Start the event",
    },
    messagesError: {
      E0001: (a) => {
          return a + " is required";
        },
        E0002: (a, b) => {
          return "Please enter " + a + " with " + b + " or more characters" ;
        },
        E0003: (a) => {
          return a + " is incorrect format";
        },
        E0004: "Please enter all fields",
        E0005: (a) =>
          a + "must have no spaces and have 6 or more characters",
        E0006: "Please read and agree to the terms",
        E0007: (a, b) => {
          return "Existed " + a + " or " + b;
        },
        E0008: (a) => a + " already existed",
        E0009: "No user exists",
        E0010:
          "You do not have an account with this email \nTry another account or register a new account",
        E0011: (a) => a + " didn't match",
        E0021: (a, b) => {
          return "Please enter " + a + " as same as " + b;
        },
        E0022: "Load file failed",
      
        E1002: "Update failed",
        E1003: "Delete failed",
        E2001: "Wrong pincode, please enter again",
        E2002: "Do not leave the PIN blank",
        E2003: "The code could not be scanned, please rescan the QR code",
        E2004: "Event does not exist or has been deleted",
        E2005: "Event has reached the maximun player",
        E2006: "This event require login",
        E3001: "The event is not ready, you cannot join in!",
        E3002: "The event is currently in-game , you cannot join in!",
        E3003: "Event has ended!",
        E4444: "A system error has occurred",
        E5555: "Cannot connect camera on this device"
    }
  };
  export default messEn;