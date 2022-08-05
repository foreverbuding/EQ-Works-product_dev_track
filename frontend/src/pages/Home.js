import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const handleSearch = () => {
    if (name) {
      fetch(`http://localhost:5000/search/${name}`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            navigate(`/detail/${data[0].poi_id}`)
          } else {
            alert('No matched data!');
          }
        })
    }

  }
  useEffect(() => {
    fetch(`http://localhost:5000/poi`)
      .then(res => res.json())
      .then(data => {
        const map = new window.google.maps.Map(document.getElementById("map"), {
          zoom: 4,
          center: {
            lat: data[0].lat,
            lng: data[0].lon
          },
        });
        for (let spot of data) {
          let position = {
            lat: spot.lat,
            lng: spot.lon
          }
          let marker = new window.google.maps.Marker({
            position,
            map: map,
          });
          marker['name'] = spot.name;
          marker['poi_id'] = spot.poi_id;
          marker.addListener("click", function () {
            //navigate(`/detail/${this.poi_id}`)
            const infowindow = new window.google.maps.InfoWindow({
              content: `
                <div>
                    <h1>${this.name}</h1> 
                    <a href="/detail/${this.poi_id}" class="btn btn-link">Go</a>   
                </div>`,
              maxWidth: 300,
            });
            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            })
          })
        }
      })
  }, []);
  return (
    <div className={'container-fluid p-0'}>
      <div style={{width: '100%', height: '10vh'}}>
        <div className={'w-25 p-4 d-flex'}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder={'Enter position name'} className={'form-control'}/>
          <button onClick={handleSearch} className={'btn btn-primary'}>Search</button>
        </div>
      </div>
      <div id={'map'} style={{width: '100%', height: '90vh'}}></div>
    </div>
  )
}
export default Home;