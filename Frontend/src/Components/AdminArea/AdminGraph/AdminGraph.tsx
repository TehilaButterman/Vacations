import { useEffect } from "react";
import "./AdminGraph.css";
import store from "../../../Redux/Store";
import GraphObjectModel from "../../../Models/GraphObjectModel";
import CanvasJSReact from '../../../canvasjs-3.6.6/canvasjs.react';


const CanvasJSChart = CanvasJSReact.CanvasJSChart;
function AdminGraph(): JSX.Element {

    useEffect(() => {
        
        if (options.data[0].dataPoints.length === 0) {
            const data = store.getState().vacationsState.reportState;
            data.map(vacation =>
                options.data[0].dataPoints.push({
                    label: vacation.target,
                    y: vacation.followers
                })
            )
        }
    }, []);


    const options: GraphObjectModel = {
        title: {
            text: "Followed vacations"
        },
        data: [
            {
                type: "column",
                dataPoints: [
                ]
            }
        ]
    }
    return (

        <div>
            <CanvasJSChart options={options}
            />
        </div>


    );

}


export default AdminGraph;




