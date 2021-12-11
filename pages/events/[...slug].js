import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage() {
    const router = useRouter();
    const filterData = router.query.slug;

    if (!filterData) {
        return <p className="center">Loading...</p>;
    }

    const [filteredYear, filteredMonth] = filterData;
    const year = +filteredYear;
    const month = +filteredMonth;

    if (
        isNaN(year) ||
        isNaN(month) ||
        year > 2030 ||
        year < 2021 ||
        month < 1 ||
        month > 12
    ) {
        return (
            <>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link={"/events"}>Show all events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = getFilteredEvents({
        year,
        month
    });

    if (!filteredEvents || !filteredEvents.length) {
        return (
            <>
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link={"/events"}>Show all events</Button>
                </div>
            </>
        );
    }

    const date = new Date(year, month - 1);

    return (
        <>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    );
}

export default FilteredEventsPage;
