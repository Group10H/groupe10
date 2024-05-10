import React from "react";
import { useState } from "react";

const SalleFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedSalleType = e.target.value;
    setFilter(selectedSalleType);
    const filteredSalles = data.filter((salle) =>
      salle.salletype.toLowerCase().includes(selectedSalleType.toLowerCase())
    );
    setFilteredData(filteredSalles);
  };
  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  const salleTypes = ["", ...new Set(data.map((salle) => salle.salletype))].filter(Boolean);

  return (
    <div className="input-group mb-3">
    <span className="input-group-text" id="salle-type-filter">
        Filtrer Salles par type
    </span>
    <select
        className="form-select"
        aria-label="salle type filter"
        value={filter}
        onChange={handleSelectChange}>
        <option value="">selectionner un type pour filtrer....</option>
        {salleTypes.map((type, index) => (
            <option key={index} value={String(type)}>
                {String(type)}
            </option>
        ))}
    </select>
    <button className="btn btn-hotel"  type="button" onClick={clearFilter}>
        clear filtre
    </button>
</div>


  )
};

export default SalleFilter;
