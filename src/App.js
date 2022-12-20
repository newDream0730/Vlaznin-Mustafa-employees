import React from "react";
import CSVReader from 'react-csv-reader'
import "./App.css";

function App() {
  const [list, setList] = React.useState([]);

  let listObj = [];
  let filteredObj = [];

  const TdItem = (props) => {
    const { row } = props;
    console.log(row)
    return (
      <tr>
        <td>{row.employee_1}</td>
        <td>{row.employee_2}</td>
        <td>{row.projectID}</td>
        <td>{row.days}</td>
      </tr>
    )
  }

  const handleupload = (rows) => {
    let headers = rows.shift()
    setList(rows);
    rows.map((row) => {
      let obj = {};
      headers.forEach((element, index) => {
        obj[element] = row[index];
      });
      listObj.push(obj);
    });
    for(let i = 0; i < listObj.length; i++){
      let newObj = {};
      for(let j = i+1; j < listObj.length; j++) {
        if(listObj[i].ProjectID === listObj[j].ProjectID) {
          let firstFrom = new Date(listObj[i].DateFrom);
          let secondFrom = new Date(listObj[j].DateFrom);
          let firstTo= converDate(listObj[i].DateTo);
          let secondTo = converDate(listObj[j].DateTo);
          if(firstFrom > secondFrom){
            if(firstFrom<secondTo) {
              newObj['employee_1'] = listObj[i].EmployeeID;
              newObj['employee_2'] = listObj[j].EmployeeID;
              newObj['projectID'] = listObj[i].ProjectID;
              newObj['days'] = (secondTo.getTime()-firstFrom.getTime())/ (1000 * 3600 * 24);
              filteredObj.push(newObj)

            }
          } else {
            if(secondFrom<firstTo) {
              newObj['employee_1'] = listObj[i].EmployeeID;
              newObj['employee_2'] = listObj[j].EmployeeID;
              newObj['projectID'] = listObj[i].ProjectID;
              newObj['days'] = (firstTo.getTime()-secondFrom.getTime())/ (1000 * 3600 * 24);
              filteredObj.push(newObj)
            }
          }
        }
      }
    }
    setList(filteredObj)
  };

  const converDate = (toDate) => {
    if(toDate=='NULL') {
      return new Date();
    } else {
      return new Date(toDate)
    }
  }

  return (
    <div className="App">
      <CSVReader onFileLoaded={(rows) => handleupload(rows)} />
      <table>
        <thead>
          <tr>
            <th>Employee#1 ID</th>
            <th>Employee#2 ID</th>
            <th>Project ID</th>
            <th>Days Worked</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((row, index) => (
              <tr key={index}>
                <td>{row.employee_1}</td>
                <td>{row.employee_2}</td>
                <td>{row.projectID}</td>
                <td>{row.days}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
