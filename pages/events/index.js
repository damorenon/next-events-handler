import { useRouter } from "next/router";
import { getAllEvents } from "../../helper/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import Head from "next/head";

function AllEventsPage({ events }) {
    const router = useRouter();

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }

    return (
        <>
            <Head>
                <title>All Events</title>
                <meta name="description" content="Find a lot of great events" />
            </Head>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </>
    );
}

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events
        },
        revalidate: 60
    };
}

export default AllEventsPage;
