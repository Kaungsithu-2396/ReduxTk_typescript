interface data {
    name: string;
    age: number;
    gender: "male" | "female";
}
type isAllowed = (gender: "male" | "female") => boolean;
const classifyEntrance: isAllowed = (gender) => gender === "male";

export default function Home({ name, age, gender }: data) {
    return (
        <>
            <div className="">
                <h1>Name : {name}</h1>
                <h1>Age: {age}</h1>
                <h1>Gender: {gender}</h1>
                <h2>
                    register as {classifyEntrance(gender) ? "male" : "female"}
                </h2>
            </div>
        </>
    );
}
