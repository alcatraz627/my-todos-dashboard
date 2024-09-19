export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  reminder?: Date;
}

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Create Books",
    completed: false,
  },
  {
    id: "2",
    title: "Write Color",
    completed: false,
  },
  {
    id: "3",
    title: "Paint Words",
    completed: true,
    reminder: new Date(),
  },
];

export default function Page() {
  return (
    <div className="">
      {sampleTasks.map((task) => (
        <div key={task.id} className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              defaultChecked={task.completed}
            />
            <span className="label-text">{task.title}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
