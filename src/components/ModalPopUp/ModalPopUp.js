import React, { useEffect } from "react";

import "./ModalPopUp.css";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import StepConnector from "@material-ui/core/StepConnector";
import Typography from "@material-ui/core/Typography";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import FormUser from "./FormUser";
const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});
function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}
QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 16,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonAddIcon />,
    2: <LocalHospitalIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}
ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    border: "1px solid white",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    backgroundColor: "white",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
function getSteps() {
  return [""];
}
 function ModalPopUp() {
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormUser
            useStyles={useStyles}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      // case 1:
      //   return (
      //     <LinkHospital activeStep={activeStep} setActiveStep={setActiveStep}/>
      //   );
      default:
        return;
    }
  };

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div
      className="modal fade "
      id="exampleModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className={classes.root}>
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                
                ))}
              </Stepper>
            </div>
          </div>
          <div className="modal-body">
            {activeStep === steps.length ? (
              <>
                <Typography component="div" className={classes.instructions}>
                  All steps completed - you&apos;re finished
                </Typography>
               
              </>
            ) : (
              <Typography component="div" className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(ModalPopUp);
