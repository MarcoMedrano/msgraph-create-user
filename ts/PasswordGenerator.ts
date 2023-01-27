export class PasswordGenerator {
    public static generate(): string {
        const specialCharacters = "~!@#$%^&*_-+=`|\\(){}[]:;\"'<>,.?/";
        const dic1 = ["do", "pull", "push", "good", "mark", "try", "create", "just", "dive", "go", "make", "action", "build", "change", "inspire"];
        const dic2 = ["LOVE", "KEY", "MEANS", "PERFECT", "POSITIVE", "BETTER", "EXCEL", "BEST", "FANTASTIC", "GREAT", "AWESOME", "WORLD", "LEADER", "IND", "HELP"];
        const number = Math.floor(Math.random() * 9999)

        const i1 = Math.floor(Math.random() * (dic1.length - 1))
        const i2 = Math.floor(Math.random() * (specialCharacters.length - 1))
        const i3 = Math.floor(Math.random() * (dic2.length - 1))
        const i4 = Math.floor(Math.random() * (specialCharacters.length - 1))

        return dic1[i1] + specialCharacters[i2] + dic2[i3] + specialCharacters[i4] + number;
    }
}