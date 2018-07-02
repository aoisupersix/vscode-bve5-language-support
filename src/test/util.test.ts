import * as assert from 'assert';
import * as myExtension from '../util';

// Defines a Mocha test suite to group tests of similar kind together
suite("Util Tests", function () {

    test("TrimMapText", function() {
        assert.equal(
            "Curve.BeginTransition();",
            myExtension.trimMapText(
                `BveTs Map 2.02
                
                Curve.
                BeginTransition
                ()
                ;`
            )
        );
        assert.equal(
            "",
            myExtension.trimMapText(
                ``
            )
        );
    });
});