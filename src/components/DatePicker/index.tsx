import Calendar from '../Calendar';

export default function DatePicker({
  selectedDate,
  onSelect,
  isActive,
}: {
  selectedDate: Date;
  onSelect: any;
  isActive: boolean;
}) {
  return (
    <div
      className='datePicker'
      style={{ display: isActive ? 'block' : 'none' }}
    >
      <Calendar onSelect={onSelect} selectedDate={selectedDate} />
    </div>
  );
}
