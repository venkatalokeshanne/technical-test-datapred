import React, { useState } from "react";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import "react-datepicker/dist/react-datepicker.css";
import {
    apiAuth,
    fetchTrends,
    runsBasedOnDate,
    runsOutputs,
} from "../../api/datapredAPI";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

function Trends() {
    let token;
    const [trends, setTrends] = useState([]);
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    apiAuth().then(async (apiToken) => {
        token = apiToken;
    });

    async function getTrendsByDate(date) {
        let allRunsOutput = [];
        // get run based on selected date
        await runsBasedOnDate(token, date).then((response) => {
            if (response.results) {
                let runsOutput = response.results.map((result) => {
                    if (result.complete === false) {
                        errorHandling("no complete run for this date")
                    }
                    return runsOutputs(token, result.flow, result.id)
                });
                Promise.allSettled(runsOutput) // getting response after all promises are settled
                    .then((outputs) => {
                        outputs.forEach((run) => {
                            if (run.status === "fulfilled") {
                                allRunsOutput = allRunsOutput.concat(run.value.results);
                            }
                        });
                        return allRunsOutput;
                    })
                    .then((response) => {
                        getTrends(response);
                    });
            } else {
                errorHandling("no run available for this date");
            }
        });
    }

    function getTrends(response) {
        let allTrends = [];

        let requestsForTrends = response.map((output) =>
            fetchTrends(token, output.run, output.id)
        );
        // getting tends after all promises settled
        Promise.allSettled(requestsForTrends).then((trend) => {
            trend.forEach((element) => {
                if (element.status === "fulfilled" && element.value.results !== undefined) {
                    allTrends = allTrends.concat(element.value.results);
                }
            });
            if (allTrends.length > 0) {
                setTrends(allTrends);
                setError(null);
            } else {
                errorHandling("no run available for this date");
            }
        });
    }

    // handling error if data is not available
    function errorHandling(response) {
        setError(response);
        setTrends([]);
    }

    // event on date change
    function onChangeDate(value) {
        setValue(value);
        getTrendsByDate(formatDate(value) + "T00:00:00Z");
    }

    // formating date 
    function formatDate(value) {
        const date = moment(new Date(value)).format("YYYY-MM-DD");
        return date;
    }

    return (
        <div>
            <h2 className="mb-5">Select the date to display the trends</h2>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    className="margin-auto mt-8"
                    value={value}
                    label="Pick date"
                    onChange={(date) => onChangeDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            {trends.length > 0 && (
                <table className="margin-auto mt-8">
                    <thead>
                        <tr className="text-center">
                            <td>Horizon Date</td>
                            <td>Horizon Name</td>
                            <td>Trend</td>
                        </tr>
                    </thead>
                    <tbody>
                        {trends.map((trend) => (
                            <tr className="text-center" key={trend.horizon}>
                                <td>{formatDate(trend.horizon_date)}</td>
                                <td>{trend.horizon_name}</td>
                                <td>{trend.trend}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {error !== null && <p className="color-red">{error}</p>}
        </div>
    );
}

export default Trends;
