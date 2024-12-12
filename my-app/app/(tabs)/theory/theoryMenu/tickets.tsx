import TicketsWindow from "../../../../components/TicketsWindow/TicketsWindow";

export default function TabTwoScreen() {
  return (
      <TicketsWindow onClose={() => console.log(123)}/>
  );
}
