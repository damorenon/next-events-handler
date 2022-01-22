import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helper/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

function FilteredEventsPage({ hasError, events, date }) {
    const router = useRouter();

    // we can alternatively use client side data fetch here, this filter page is not critical for search engines
    // const { data, error } = useSWR("https://nextjs-events-handler-default-rtdb.firebaseio.com/events.json")
    // + useEffect + useState

    /* const filterData = router.query.slug;

    if (!filterData) {
        return <p className="center">Loading...</p>;
    }

    const [filteredYear, filteredMonth] = filterData;
    const year = +filteredYear;
    const month = +filteredMonth; */

    const PageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta
                name="description"
                content={`All events found for ${date.month}/${date.year}`}
            />
        </Head>
    );

    if (hasError) {
        return (
            <>
                {PageHeadData}
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link={"/events"}>Show all events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = events;

    if (!filteredEvents || !filteredEvents.length) {
        return (
            <>
                {PageHeadData}
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link={"/events"}>Show all events</Button>
                </div>
            </>
        );
    }

    const EventDate = new Date(date.year, date.month - 1);

    return (
        <>
            {PageHeadData}
            <ResultsTitle date={EventDate} />
            <EventList items={filteredEvents} />
        </>
    );
}

export async function getServerSideProps({ params }) {
    const filterData = params.slug;
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
        return {
            props: { hasError: true }
            //notFound: true
        };
    }

    const filteredEvents = await getFilteredEvents({
        year,
        month
    });

    return {
        props: {
            events: filteredEvents,
            date: { year, month }
        }
    };
}

export default FilteredEventsPage;
