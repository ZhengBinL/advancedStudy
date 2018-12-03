module.exports = {
    root:true,
    parser:"babel-eslint",
    "env": {
        "browser": true,
        "commonjs":true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "windows"
        ],
        "no-console":[
            2,{
                "allow":["warn","info","error"]
            }
        ]
    }
};