import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'magnitude'})

export class MagnitudePipe implements PipeTransform  {
    magnitudes: {[col: number] : string} = {0 : '', 3 : 'K', 6 : 'M', 9 : 'B', 12 : 'T', 15 : 'P'};

    transform(v: number): string {
        var s = v.toString();
        const l = s.length
        var c = 0;
        var r = s.slice(0,l);
        while (c <= 15) {
            if (l > c) {
                r = s.slice(0, l-c) + '.' + s.slice(l-c, l-c+1) + this.magnitudes[c];
            }
            c += 3;
        }
        return r;
    }
}