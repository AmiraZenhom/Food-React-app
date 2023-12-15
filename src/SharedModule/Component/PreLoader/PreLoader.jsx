
import { RotatingLines } from "react-loader-spinner";

export default function PreLoader() {
  return (
    <>
       <div className="d-flex align-items-center justify-content-center  my-5 pt-5">
       <RotatingLines
  strokeColor="green"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/>
      
    </div>
    
    </>
  )
}
