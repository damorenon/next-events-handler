import { getFeaturedEvents } from "../helper/api-util";
import EventList from "../components/events/event-list";

function HomePage({ events }) {
    return (
        <div>
            <EventList items={events} />
        </div>
    );
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    };
}

export default HomePage;
