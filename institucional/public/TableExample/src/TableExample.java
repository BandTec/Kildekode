import java.awt.Color;
import java.awt.EventQueue;
import javax.swing.JFrame;
import javax.swing.JTable;
import javax.swing.JScrollPane;
import javax.swing.JComboBox;
import javax.swing.table.AbstractTableModel;
import javax.swing.table.TableColumn;
import javax.swing.DefaultCellEditor;
public class TableExample {
	
public static void main(String[] args) {

EventQueue.invokeLater(new Runnable()
{
@Override
public void run()
{
new TableExample();
}
});
}
public TableExample()
{
JFrame JFrame = new JFrame();
JFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
JFrame.setTitle("Informações da Máquina");
JFrame.setSize(1366,768);
JFrame.setLocationRelativeTo(null);

JTable table = new JTable(new ExampleTableModel());

table.setAutoCreateRowSorter(true);

table.setGridColor(Color.green);
table.setBackground(Color.LIGHT_GRAY);

String[] countries = {"Australia", "Brazil", "Canada", "China"
,"France", "Japan", "Norway", "Russia", "South Korea"
, "Tunisia", "USA"};
JComboBox countryCombo = new JComboBox(countries);

TableColumn countryColumn = table.getColumnModel().getColumn(2);
countryColumn.setCellEditor(new DefaultCellEditor(countryCombo));

TableColumn eventColumn = table.getColumnModel().getColumn(3);
eventColumn.setPreferredWidth(150);
TableColumn placeColumn = table.getColumnModel().getColumn(4);
placeColumn.setPreferredWidth(5);
JScrollPane tableScrollPane = new JScrollPane(table);
JFrame.add(tableScrollPane);
JFrame.setVisible(true);
}
class ExampleTableModel extends AbstractTableModel{
String[] columnNames = {"First Name", "Surname", "Country"
, "Event", "Place", "Time", "World Record" };
Object[][] data = {
{"César Cielo", "Filho", "Brazil", "50m freestyle",1 , "21.30", false },
{"Amaury", "Leveaux", "France", "50m freestyle", 2, "21.45", false },
{"Alain", "Bernard", "France", "50m freestyle", 3, "21.49", false },
{"Alain", "Bernard", "France", "100m freestyle", 1, "47.21", false },
{"Eamon", "Sullivan", "Australia", "100m freestyle", 2, "47.32", false },
{"Jason", "Lezak", "USA", "100m freestyle", 3, "47.67", false },
{"César Cielo", "Filho", "Brazil", "100m freestyle", 3, "47.67", false },
{"Michael", "Phelps", "USA", "200m freestyle", 1, "1:42.96", true },
{"Park", "Tae-Hwan", "South Korea", "200m freestyle", 2, "1:44.85", false },
{"Peter", "Vanderkaay", "USA", "200m freestyle", 3, "1:45.14", false },
{"Park", "Tae-Hwan", "South Korea", "400m freestyle", 1, "3:41.86", false },
{"Zhang", "Lin", "China", "400m freestyle", 2, "3:42.44", false },
{"Larsen", "Jensen", "USA", "400m freestyle", 3, "3:42.78", false },
{"Oussama", "Mellouli", "Tunisia", "1500m freestyle",1 , "14:40.84", false },
{"Grant", "Hackett", "Australia", "1500m freestyle", 2, "14:41.53", false },
{"Ryan", "Cochrane", "Canada", "1500m freestyle", 3, "14:42.69", false },
};
@Override
public int getRowCount()
{
return data.length;
}
@Override
public int getColumnCount()
{
return columnNames.length;
}
@Override
public Object getValueAt(int row, int column)
{
return data[row][column];
}
//Used by the JTable object to set the column names
@Override
public String getColumnName(int column) {
return columnNames[column];
}

@Override
public Class getColumnClass(int c) {
return getValueAt(0, c).getClass();
}
@Override
public boolean isCellEditable(int row, int column)
{
if (column == 0 || column == 1)
{
return false;
}
else
{
return true;
}
}
}
}