import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../../components/Navigation/Navigation';
import './Cars.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'

// axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }


enum Sort {
  NONE,
  GROUPID,
  CLUBBER,
  CLUB,
  DIVISION
}


const Cars = () => {
  const [cars, setCars] = useState();
  const [sort, setSort] = useState(Sort.NONE);
  const [isRaceGroupStared, setIsRaceGroupStared] = useState(true);

  useEffect(() => {
    axios.get('/race-groups/current', {})
    .then(function (response) {
      if (response.data.id) {
        setIsRaceGroupStared(true);
      } else {
        setIsRaceGroupStared(false);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    updateCars()
  }, [])

  

  const updateCars = () => {
    axios.get('/cars', {})
      .then(function (response) {
        setCars(response.data.map((car: any) => {
          const fillNeeded = 3 - car.group_id.length;
          const filler = Array(fillNeeded).fill('0').join('')
          return {
            id: car.id,
            group_id: car.group_id.substr(0, 1) + filler + car.group_id.substr(1, car.group_id.length),
            clubber: car.clubber,
            club: car.club,
            division: car.division
          }
        }))
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const deleteCar = (id: number) => {
    axios.delete(`/cars/${id}`)
      .then(function (response) {
        updateCars()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Navigation></Navigation>

      <table className={'carsTable'}>
        <thead>
          <tr>
            <th onClick={() => {
              setSort(Sort.GROUPID)
              console.log(sort)
            }}>ID <FontAwesomeIcon icon={faSort} /></th>
            <th onClick={() => {
              setSort(Sort.CLUBBER)
            }}>CLUBBER <FontAwesomeIcon icon={faSort} /></th>
            <th onClick={() => {
              setSort(Sort.CLUB)
            }}>CLUB <FontAwesomeIcon icon={faSort} /></th>
            <th onClick={() => { setSort(Sort.DIVISION) }}>DIVISION <FontAwesomeIcon icon={faSort} /></th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>

        {sort === Sort.NONE && cars && cars.map((car: any, i: number) => {
              return (
                <tr key={i}>
                  <td>{car.group_id}</td>
                  <td>{car.clubber}</td>
                  <td>{car.club}</td>
                  <td>{car.division}</td>
                  <td>
                      { !isRaceGroupStared &&
                        <button onClick={() => {
                        deleteCar(car.id);
                        }}>Delete</button>
                      }
                      { isRaceGroupStared &&
                        <button disabled>Delete</button>
                      }
                  </td>
                </tr>
              )
            })}
          {sort === Sort.GROUPID && cars && cars.sort((car1: any, car2: any) => {
              return car1.group_id > car2.group_id ? 1 : -1;
            }).map((car: any, i: number) => {
              return (
                <tr key={i}>
                  <td>{car.group_id}</td>
                  <td>{car.clubber}</td>
                  <td>{car.club}</td>
                  <td>{car.division}</td>
                  <td>
                      { !isRaceGroupStared &&
                        <button onClick={() => {
                        deleteCar(car.id);
                        }}>Delete</button>
                      }
                      { isRaceGroupStared &&
                        <button disabled>Delete</button>
                      }
                  </td>
                </tr>
              )
            })}
            {sort === Sort.CLUBBER && cars && cars.sort((car1: any, car2: any) => {
              return car1.clubber > car2.clubber ? 1 : -1;
            }).map((car: any, i: number) => {
              return (
                <tr key={i}>
                  <td>{car.group_id}</td>
                  <td>{car.clubber}</td>
                  <td>{car.club}</td>
                  <td>{car.division}</td>
                  <td>
                      { !isRaceGroupStared &&
                        <button onClick={() => {
                        deleteCar(car.id);
                        }}>Delete</button>
                      }
                      { isRaceGroupStared &&
                        <button disabled>Delete</button>
                      }
                  </td>
                </tr>
              )
            })}
            {sort === Sort.CLUB && cars && cars.sort((car1: any, car2: any) => {
              return car1.club > car2.club ? 1 : -1;
            }).map((car: any, i: number) => {
              return (
                <tr key={i}>
                  <td>{car.group_id}</td>
                  <td>{car.clubber}</td>
                  <td>{car.club}</td>
                  <td>{car.division}</td>
                  <td>
                      { !isRaceGroupStared &&
                        <button onClick={() => {
                        deleteCar(car.id);
                        }}>Delete</button>
                      }
                      { isRaceGroupStared &&
                        <button disabled>Delete</button>
                      }
                  </td>
                </tr>
              )
            })}
            {sort === Sort.DIVISION && cars && cars.sort((car1: any, car2: any) => {
              return car1.division > car2.division ? 1 : -1;
            }).map((car: any, i: number) => {
              return (
                <tr key={i}>
                  <td>{car.group_id}</td>
                  <td>{car.clubber}</td>
                  <td>{car.club}</td>
                  <td>{car.division}</td>
                  <td>
                      { !isRaceGroupStared &&
                        <button onClick={() => {
                        deleteCar(car.id);
                        }}>Delete</button>
                      }
                      { isRaceGroupStared &&
                        <button disabled>Delete</button>
                      }
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  );
}

export default Cars;
