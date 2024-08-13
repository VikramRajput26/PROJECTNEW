import React from "react";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Immune.css';

const Immune = () => {
  return (
    <div className="container mt-4">
      <h2>National Immunization Schedule (NIS)</h2>

      <h4>For Pregnant Women</h4>
      <Table striped bordered hover className="table-striped table-hover">
        <thead>
          <tr>
            <th>Vaccine</th>
            <th>When to Give</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TT-1</td>
            <td>Early in pregnancy</td>
          </tr>
          <tr>
            <td>TT-2</td>
            <td>4 weeks After TT-1*</td>
          </tr>
          <tr>
            <td>TT-Booster</td>
            <td>
              If received 2 TT doses in a pregnancy within the last 3 yrs*
            </td>
          </tr>
        </tbody>
      </Table>

      <h4>For Infants</h4>
      <Table striped bordered hover className="table-striped table-hover">
        <thead>
          <tr>
            <th>Vaccine</th>
            <th>When to Give</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BCG</td>
            <td>At birth or as early as possible till one year of age</td>
          </tr>
          <tr>
            <td>Hepatitis B</td>
            <td>At birth or as early as possible within 24 hours</td>
          </tr>
          <tr>
            <td>OPV-O</td>
            <td>At birth or as early as possible within 15 hours</td>
          </tr>
          <tr>
            <td>OPV 1, 2, 3</td>
            <td>At 6 Weeks, 10 Weeks, 14 Weeks</td>
          </tr>
          <tr>
            <td>DTP 1, 2, 3</td>
            <td>At 6 Weeks, 10 Weeks, 14 Weeks</td>
          </tr>
          <tr>
            <td>Hepatitis B 1, 2, 3</td>
            <td>At 6 Weeks, 10 Weeks, 14 Weeks</td>
          </tr>
          <tr>
            <td>Measles</td>
            <td>
              9 Completed months-12 months (give up to 5 years if not received
              at 9-12 months age)
            </td>
          </tr>
          <tr>
            <td>Measles Booster</td>
            <td>At 1 Year</td>
          </tr>
          <tr>
            <td>Vitamin A (1st Dose)</td>
            <td>At 9 months with measles</td>
          </tr>
        </tbody>
      </Table>

      <h4>For Children</h4>
      <Table striped bordered hover className="table-striped table-hover">
        <thead>
          <tr>
            <th>Vaccine</th>
            <th>When to Give</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DTP Booster</td>
            <td>16-24 months</td>
          </tr>
          <tr>
            <td>OPV Booster</td>
            <td>16-24 months</td>
          </tr>
          <tr>
            <td>Vitamin A (2nd to 9th Dose)</td>
            <td>
              16 months with DTP/OPV booster then, one dose every 6 months up to
              the age of 5 years
            </td>
          </tr>
          <tr>
            <td>DTP Booster</td>
            <td>5-6 Years</td>
          </tr>
          <tr>
            <td>TT</td>
            <td>10 Years, 16 Years</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Immune;
