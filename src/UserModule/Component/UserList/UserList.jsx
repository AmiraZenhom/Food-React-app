
import Header from '../../../SharedModule/Component/Header/Header'
import header from "../../../assets/images/Group 48102127.png";

export default function UserList() {
  return (
    <>
    <Header >
                <div className='header-content  m-2 text-white '>
                  <div className="row px-4 py-2 g-0 align-Items-center  ">
                    <div className="col-sm-10  ">
                      <div className="mx-3">
                        <h3>Welcom Uouo</h3>
                        <p>Lorem ipsum dolor sit amet.</p>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <img className='img-fluid' src={header} alt="" />
                    </div>
                  </div>
                </div>
                </Header>
    
    
    </>
  )
}
