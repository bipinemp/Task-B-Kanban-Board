import ColumnForm from "./components/forms/ColumnForm";
import Container from "./components/ui/Container";
import KanbanColumns from "./components/KanbanColumns";

function App() {
  return (
    <Container>
      <main className="flex flex-col justify-center items-center gap-y-20">
        <ColumnForm />
        <KanbanColumns />
      </main>
    </Container>
  );
}

export default App;
