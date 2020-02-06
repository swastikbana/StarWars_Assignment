import React, { Component } from 'react';
import './Autocomplete.css';
class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredValue: '',
      planetList: '',
      displayList: 'block',
      selectedPlanet: ''
    };
  }

  onChange(e) {
    const baseUrl = 'https://swapi.co/api/';

    fetch(`${baseUrl}planets/?search=${e.target.value}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ planetList: data.results });
      })
      .catch(error => this.setState({ error }));

    this.setState({
      enteredValue: e.target.value,
      displayList: 'block'
    });
  }

  onClickPlanet(planet) {
    console.log(planet);
    this.setState({
      enteredValue: planet.name,
      displayList: 'none',
      selectedPlanet: planet
    });
  }

  render() {
    const { planetList, selectedPlanet } = this.state;
    let itemList;
    if (planetList !== '') {
      console.log(planetList);
      itemList = (
        <ul className="options" style={{ display: this.state.displayList }}>
          {planetList.map(planet => {
            return (
              <li
                key={planet.name}
                onClick={this.onClickPlanet.bind(this, planet)}
                style={{ fontSize: planet.population.length * 2 }}
              >
                {planet.name}
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <div className="searchform">
        <input
          type="text"
          placeholder="Search Planet "
          value={this.state.enteredValue}
          onChange={this.onChange.bind(this)}
        />
        {itemList}
        {selectedPlanet !== '' ? (
          <div
            style={{
              display: this.state.displayList === 'block' ? 'none' : 'block'
            }}
          >
            <table className="tableData">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Rotation Period</th>
                  <th>Orbital Period</th>
                  <th>Diameter</th>
                  <th>Climate</th>
                  <th>Gravity</th>
                  <th>Terrain</th>
                  <th>Surface Water</th>
                  <th>Population</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedPlanet.name}</td>
                  <td>{selectedPlanet.rotation_period}</td>
                  <td>{selectedPlanet.orbital_period}</td>
                  <td>{selectedPlanet.diameter}</td>
                  <td>{selectedPlanet.climate}</td>
                  <td>{selectedPlanet.gravity}</td>
                  <td>{selectedPlanet.terrain}</td>
                  <td>{selectedPlanet.surface_water}</td>
                  <td>{selectedPlanet.population}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Autocomplete;
