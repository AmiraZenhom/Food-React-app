import Photo from "../../../assets/images/nodata.png"

export default function NoData() {
  return (
    <>
    <div className="text-center">
        <img src={Photo} alt="no data" />
        <h4>No Data Found</h4>
    </div>
    
    </>
  )
}
