export class HashManagerMock {
    public hash = async (
        plaintext: string
    ): Promise<string> => {
        return "hash-mock"
    }

    public compare = async (
        plaintext: string,
        hash: string
    ): Promise<boolean> => {
        switch (plaintext) {
            case "lau123":
                return hash === "hash-mock-lau"

            case "yuzo123":
                return hash === "hash-mock-yuzo"

            case "vini123":
                return hash === "hash-mock-vini"

            case "gabi123":
                return hash === "hash-mock-gabi"

            case "clara123":
                return hash === "hash-mock-clara"

            case "luiz123":
                return hash === "hash-mock-luiz"

            case "jessica123":
                return hash === "hash-mock-jessica"

            default:
                return false
        }
    }
}