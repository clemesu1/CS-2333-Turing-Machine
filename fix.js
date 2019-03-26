function runMachine(left, right) {
    var totalString = left + '#' + right;
    var head = 0;
    q1(totalString, head);
}

function q1(totalString, head) {
    if(totalString.charAt(head) == '#')
        q8(totalString, head);
    else if(totalString.charAt(head) == '0')  {
        totalString = setCharAt(totalString, head, 'x');
        head++;
        q2(totalString, head);
    }
    else if(totalString.charAt(head) == '1')  {
        totalString = setCharAt(totalString, head, 'x');
        head++;
        q3(totalString, head);
    }
}

function q2(totalString, head) {
    if(totalString.charAt(head) == '0' || totalString.charAt(head) == '1') {
        head++;
        q2(totalString, head);
    }
    else if(totalString.charAt(head) == '#') {
        head++;
        q4(totalString, head);
    }
}

function q3(totalString, head) {
    if(totalString.charAt(head) == '0' || totalString.charAt(head) == '1') {
        head++;
        q3(totalString, head);
    }
    else if(totalString.charAt(head) == '#') {
        head++;
        q5(totalString, head);
    }
}

function q4(totalString, head) {
    if(totalString.charAt(head) == 'x') {
        head++;
        q4(totalString, head);
    }
    else if(totalString.charAt(head) == '0') {
        totalString = setCharAt(totalString, head, 'x');
        head--;
        q6(totalString, head);
    }
}

function q5(totalString, ) {
    if(totalString.charAt(head) == 'x') {
        head++;
        q5(totalString, head);
    }
    else if(totalString.charAt(head) == '1') {
        totalString = setCharAt(totalString, head, 'x');
        head--;
        q6(totalString, head);
    }
}

function q6(totalString, head) {
    if(totalString.charAt(head) == '0' || totalString.charAt(head) == '1' || totalString.charAt(head) == 'x') {
        head--;
        q6(totalString, head);
    }
    else if(totalString.charAt(head) == '#') {
        head--;
        q7(totalString, head);
    }
}

function q7(totalString, head) {
    if(totalString.charAt(head) == '0' || totalString.charAt(head) == '1') {
        head--;
        q7(totalString, head);
    }
    else if(totalString.charAt(head) == 'x') {
        head++;
        q1(totalString, head);
    }
}