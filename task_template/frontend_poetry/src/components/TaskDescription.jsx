const TaskDescription = () => {
  return (
    <div className="task-description">
      <h2>🖋️ Short story task</h2>
      <h3>📜 Rules</h3>
      <ol>
        <li>Provide a theme for the short story.</li>
        <li>The AI then writes the first line.</li>
        <li>Then it is your turn to respond and the AI writes another line.</li>
        <li>If you want to discuss with the AI, you can do that in the Dialogue box.</li>
        <li>The game ends when the story has 10 lines.</li>
        <li>Please then rate your experience with the AI.</li>
      </ol>
    </div>
  );
};

export default TaskDescription;
