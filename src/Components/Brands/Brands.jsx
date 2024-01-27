import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../../Redux/brandSlice';
import { BallTriangle } from 'react-loader-spinner';




export default function Brands() {
    let dispatch = useDispatch();
    let { brands, loading, error } = useSelector((state) => state.brands)
    console.log(loading);
    useEffect(() => {
        dispatch(getBrands())

    }, [])
    return <>
        {loading ? <div className='loader d-flex align-items-center justify-content-center'>

            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>

            : <div className="row">
                {brands.map((brand) => <div className="col-md-2 cursor-pointer">
                    <div className="brand">
                        <img className="w-100" src={brand.image} alt="" />
                    </div>
                </div>)}
            </div>
        }
    </>


}


