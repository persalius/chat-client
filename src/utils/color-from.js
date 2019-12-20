import red from '@material-ui/core/colors/red';
import purple from '@material-ui/core/colors/purple';
import indigo from '@material-ui/core/colors/indigo';
import deepPurple from '@material-ui/core/colors/deepPurple';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/orange';

const colors = [red, purple, indigo, deepPurple, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange];

export default function colorFrom(string) {
    try {
        const index = string
            .toString()
            .split("")
            .map(char => char.charCodeAt())
            .reduce((sum, num) => sum + num, 0);

        const colorIndex = index % colors.length;
        return colors[colorIndex][500];
    } catch(e) {
        console.error(e);
        return purple[500];
    }
}