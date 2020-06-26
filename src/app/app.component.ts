import { Component, VERSION,  ViewChild, ViewEncapsulation } from '@angular/core';
import { DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns';
import { SpreadsheetComponent, CellRenderEventArgs, BeforeSelectEventArgs, CellFormat } from '@syncfusion/ej2-spreadsheet';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
    constructor() {

  }


    @ViewChild('spreadsheet', {static: false})
    public spreadsheetObj: SpreadsheetComponent;
    created() {
        // Applies format to specified range
        this.spreadsheetObj.cellFormat({ fontWeight: 'bold' }, 'B2:B9');
    }
    beforeCellRender(args: CellRenderEventArgs) {
      if (this.spreadsheetObj.sheets[this.spreadsheetObj.activeSheetIndex].name === 'Datos de asunto') {
          const target: HTMLInputElement = args.element.firstElementChild as HTMLInputElement;
          if (args.element.children.length) {
            const template: string = args.element.children[0].className;
            switch (template) {
                case 'e-datos-asunto':
                    const ddl_tipo_dato: string[] =  [ 'N - Número con decimales',
                                                    'R - Número entero',
                                                    'A - Alfanumérico',
                                                    'E - Texto Largo',
                                                    'B - Checkbox',
                                                    'D - Documento externo',
                                                    'L - Link',
                                                    'M - Mail',
                                                    'F - Fecha',
                                                    'H - Hora',
                                                    'Tnnn - Tabla de 1, 2 o 3 Niveles.',
                                                    'Vnnn - Tabla de 3 Niveles',
                                                    'Innn - Tabla de 2 Niveles',
                                                    'Onnn - Tabla con cache',
                                                    'Gnnn - Tabla sin cache',
                                                    'Snnn - Tabla de selección múltiple Simple',
                                                    'Ynnn - Tabla de selección multiple Completo',
                                                    'P - Selector de Personas ',
                                                    'U - Selector de Asuntos',
                                                    'C - Selector de Producto '
                                                   ];
                    new DropDownList({ placeholder: 'Tipo de Dato', dataSource: ddl_tipo_dato},  target );
                    break;
                case 'e-compartido':
                  const ddl_compartido: string[] =  [
                                                    'S',
                                                    'N '
                                                   ];
                    new DropDownList({ placeholder: 'Compartido', dataSource: ddl_compartido},  target );
                  break;
                case 'e-visible':
                  const ddl_visible: string[] =  [
                                                    'S',
                                                    'N '
                                                    ];
                    new DropDownList({ placeholder: 'Visible', dataSource: ddl_visible},  target );
                  break;
            }
          }
      }
  }
  beforeSelect(args: BeforeSelectEventArgs): void {
      // Prevents selection
      args.cancel = false;
  }

    btnClick(): void {
      this.spreadsheetObj.getData('A5:I50').then((d) => {
        console.log('d :>> ', d);
      });
      //this.spreadsheetObj.getDisplayText();
    }
}
