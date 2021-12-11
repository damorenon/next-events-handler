import Link from "next/link";
import classes from "./button.module.css";

function Button(props) {
    const { link, children, onClick } = props;

    if (link) {
        return (
            <Link href={link}>
                <a className={classes.btn}>{children}</a>
            </Link>
        );
    }

    return (
        <button className={classes.btn} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
