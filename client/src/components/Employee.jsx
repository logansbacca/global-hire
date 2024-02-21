import EditEmployee from "./EditEmployee";

export default function Employee(props) {
  return (
    <div className="relative py-8 px-8  m-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        className=" object-cover h-[100px] w-[100px] block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
        src={props.img}
        alt="Icon"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold" alt="name">
            {props.name}
          </p>
          <p className="text-md text-black font-semibold" alt="last-name">
            {props.surname}
          </p>
          <p className="text-slate-500 font-medium" alt="email">
            {props.email}
          </p>
          <p className="text-slate-500 text-cyan-600 font-medium" alt="role">
            {props.profession}
          </p>

          <EditEmployee
            name={props.name}
            email={props.email}
            id={props.id}
            position={props.profession}
            icon={props.icon}
          />
        </div>
      </div>
    </div>
  );
}
