import { Filter } from 'react-feather';
import { getDifference, getEndDate, getStartDate } from '../helpers/filterCommon';
import { Dropdown, DropdownMenu, DropdownToggle, Row, Col, ListGroup, ListGroupItem, Button, Input, InputGroup, Label, ButtonGroup, CardBody, CardHeader, Card } from 'reactstrap';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';



import './MainFilter.css'
import { colors } from '../helpers/utils';
import { useLocalStorage } from '../helpers/useLocalStorage';

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';

const MainFilter = (props) => {




    // useRef

    const isFirstRender = useRef(true);



    // redux states
    const dateFilters = [];


    // useStates
    const [dateSelection, setDateSelection] = useState("yesterday");
    const [showFilters, setShowFilters] = useState(false);




    // this is to handle the width of screen
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    console.log('windowWidth===', windowWidth);

    useEffect(() => {
        // Update the windowWidth state when the window is resized
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    const defaultDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate() - 1
    }





    // useLocalStorage states
    const [selectedDayRange, setSelectedDayRange] = useLocalStorage('selectedDayRange',
        {
            from: defaultDate,
            to: defaultDate
        }
    );





    // functions

    const toggle = () => {
        setShowFilters(!showFilters);
    }





    const setSelectedDayRangeFromCalendar = (obj) => {
        setSelectedDayRange(obj);
        setDateSelection("");
    }


    const setDateForEmployeeActivity = (obj) => {
        let object = {
            from: obj.from,
            to: obj.from
        }
        setSelectedDayRange(object);
        setDateSelection("");

    }


    const selectByDateFilter = (e) => {
        setDateSelection(e.id);
        setSelectedDayRange({ from: e.filter.from, to: e.filter.to });
    }


    const updateFilterForOnlyCalendar = async () => {




        let _endDate = await getEndDate(selectedDayRange?.to);
        let _startDate = await getStartDate(selectedDayRange?.from)




        var filter = { start: _startDate, end: _endDate, EMP: '0', }
        props.updateFilter(filter);
        setShowFilters(false)


    }


    const createDateFilters = () => {
        var dateFilters = {};
        let today = moment(new Date());
        let yesterday = moment(new Date()).subtract(1, "days");
        let thisWeek = moment(new Date()).startOf("week");
        let lastWeek = moment(new Date()).subtract(1, "week").startOf("week");
        let thisMonth = moment(new Date()).startOf("month");
        let lastMonth = moment(new Date()).subtract(1, "month").startOf("month");
        let thisYear = moment(new Date()).startOf("year");
        let lastYear = moment(new Date()).subtract(1, "year").startOf("year");
        dateFilters["today"] = { type: "day", label: "Today", from: getDateObject(today), to: getDateObject(today) };
        dateFilters["yesterday"] = { type: "day", label: "Yesterday", from: getDateObject(yesterday), to: getDateObject(yesterday) };
        dateFilters["thisWeek"] = { type: "week", label: "Current Week", from: getDateObject(thisWeek), to: getDateObject(today) };
        dateFilters["lastWeek"] = { type: "week", label: "Previous Week", from: getDateObject(lastWeek), to: getDateObject(lastWeek.endOf("week")) };
        dateFilters["thisMonth"] = { type: "month", label: thisMonth.format("MMMM"), from: getDateObject(thisMonth), to: getDateObject(today) };
        dateFilters["lastMonth"] = { type: "month", label: lastMonth.format("MMMM"), from: getDateObject(lastMonth), to: getDateObject(lastMonth.endOf("month")) };
        dateFilters["thisYear"] = { type: "year", label: thisYear.format("YYYY"), from: getDateObject(thisYear), to: getDateObject(today) };
        dateFilters["lastYear"] = { type: "year", label: lastYear.format("YYYY"), from: getDateObject(lastYear), to: getDateObject(lastYear.endOf("year")) };
        return dateFilters;
    }


    const getDateObject = (momentObj) => {
        return {
            year: momentObj.year(),
            month: momentObj.month() + 1,
            day: momentObj.date()
        }
    }


    const selectDateFilter = (key) => {
        setDateSelection(key);
        let date = dates[key];
        setSelectedDayRange({ from: date.from, to: date.to });
    }



    useEffect(() => {

        if (props.type === "calendar") {
            updateFilterForOnlyCalendar()
        }


        return () => {

        }

    }, [])






    useEffect(() => {
        let _currentDate = new Date();
        if (dateSelection === 'today') {
            if (_currentDate.getDate() != selectedDayRange.from.day || _currentDate.getMonth() + 1 != selectedDayRange.from.month || _currentDate.getFullYear() != selectedDayRange.from.year) {
                setDateSelection('')
            }
        }
    }, [selectedDayRange])




    useEffect(() => {
        if (!showFilters) {
            if (isFirstRender.current) {
                isFirstRender.current = false;
                return; // 👈️ return early if first render
            }
        }
    }, [selectedDayRange])









    const dates = createDateFilters();
    const datesMenu = Object.keys(dates).map((key) => {
        if (props.singleDate) {
            if (getDifference(dates[key].from, dates[key].to) === 0) {
                return (
                    <ListGroupItem key={'dates-' + key} className={dateSelection == key ? 'active' : ''} tag="a" href="#" onClick={() => selectDateFilter(key)}>
                        {dates[key].label}
                    </ListGroupItem>
                )
            }
        }
        else {
            return (
                <ListGroupItem key={'dates-' + key} className={dateSelection == key ? 'active' : ''} tag="a" href="#" onClick={() => selectDateFilter(key)}>
                    {dates[key].label}
                </ListGroupItem>
            )
        }

    })





    const singleRangeDateFilters = dateFilters.filter((val) => {
        return (val.filter.range === "single")
    })



    const datesMenuCustom = singleRangeDateFilters.map((val) => {

        {
            return (
                <ListGroupItem key={'dates-' + val._id} className={dateSelection == val._id ? 'active' : ''} tag="a" href="#" onClick={() => selectByDateFilter(val)}>
                    {val.label}
                </ListGroupItem>
            )
        }


    })




    return (
        <Row className='mb-4 mt-1'>
            <Col sm={2} style={{ backgroundColor: '' }} className='p-2 mt-2' >
                <h4 className='m-0 p-0 fw-normal'> {props.pageTitle} </h4>
            </Col>
            <Col className='text-end' md={10}>
                <Row>
                    <Col className='p-2 mt-2 text-end' md={10} style={{ overflow: "hidden" }} >

                    </Col>
                    <Col md={2} className='p-2'>
                        <Dropdown id="filter" className='px-1 py-2' style={{ width: "fit-content", float: "right", whiteSpace: 'nowrap' }} isOpen={showFilters} toggle={toggle} direction='down'>
                            <DropdownToggle nav
                                className='text-dark'
                                onClick={() => toggle()}
                                style={{
                                    border: "2px solid #0d6efd",
                                    borderRadius: "12px"
                                }}
                            >
                                <Filter size="16" /> Filters
                            </DropdownToggle>

                            <DropdownMenu
                                id="main"
                                style={{ width: "600px", marginTop: '10px', 'marginTop': '10px !important' }}

                            >
                                <div style={{ paddingLeft: "0.75rem", paddingRight: "0.75rem", background: "#ffffff", paddingBottom: "30px" }}>
                                    {
                                        props.type === "calendar" &&
                                        <>
                                            <Row>
                                                <Fragment>

                                                    <Col md={4} className="  pt-3 border-start border-end border-bottom border-1 ">
                                                        <div className="">
                                                            <h4 className='filter-heading'>Date Filters</h4>
                                                            <div className='scrollbar ' id="style-3" style={{ width: "100%" }}>
                                                                <ListGroup flush >
                                                                    {datesMenu}
                                                                    {datesMenuCustom}
                                                                </ListGroup>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md={8} className='border-bottom border-1'>

                                                        <Calendar
                                                            calendarClassName='pt-0 Calendar'
                                                            value={selectedDayRange}
                                                            onChange={setSelectedDayRangeFromCalendar}
                                                            shouldHighlightWeekends

                                                        />
                                                    </Col>
                                                </Fragment>

                                            </Row>
                                            <div className='text-end pt-3'>

                                                {
                                                    props.type === "calendar" &&
                                                    <Button color="primary" style={{ width: "120px" }} className='' onClick={() => updateFilterForOnlyCalendar()}>Apply</Button>
                                                }
                                            </div>

                                        </>

                                    }

                                </div>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default MainFilter;