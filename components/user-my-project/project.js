import FnProjectCard from "./projectCard";

const FnOngoingProjectUserSide = ({ projects }) => {
  return (
    <>
      {projects
        .slice(0)
        .reverse()
        .map((items, index) => {
          return (
            <div key={index}>
              <FnProjectCard
                index={index}
                name={items.project_name}
                bid={items.bid}
                id={items._id}
                architectId={items.architect_id}
                status={items?.status}
                startDate={items?.starting_date}
              />
            </div>
          );
        })}
    </>
  );
};

export default FnOngoingProjectUserSide;
