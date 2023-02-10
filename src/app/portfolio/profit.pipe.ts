import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'profitPipe'
})

export class ProfitPipe implements PipeTransform {
    transform(value: number, ...args: any[]) {
        return -1 * value;
    }
}