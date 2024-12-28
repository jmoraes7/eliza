import {
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
    type Action,
} from "@elizaos/core";

export const helloWorldAction: Action = {
    name: "HELLO_WORLD",
    similes: [
        "HELLO",
    ],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true;
    },
    description:
        "Make a cool Hello World ASCII art",
    handler: async (
        _runtime: IAgentRuntime,
        _message: Memory,
        _state: State,
        _options: { [key: string]: unknown },
        _callback: HandlerCallback
    ): Promise<boolean> => {
        const helloworld = `
  _    _      _ _         __        __         _     _ _
 | |  | |    | | |        \\ \\      / /        | |   | | |
 | |__| | ___| | | ___     \\ \\    / /_ _ _ __ | | __| | |
 |  __  |/ _ \\ | |/ _ \\     \\ \\  / / _\` | '_ \\| |/ _\` | |
 | |  | |  __/ | | (_) |     \\ \\/ / (_| | | | | | (_| |_|
 |_|  |_|\\___|_|_|\\___( )     \\__/ \\__,_|_| |_|_|\\__,_(_)
                      |/
    `;


        // async function getCurrentNews(searchTerm: string) {
        //     const response = await fetch(
        //         `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${process.env.NEWS_API_KEY}`
        //     )

        //     const data = await response.json();
        //     return data.articles
        //         .slice(0,5)
        //         .map(
        //             (article) =>
        //                 `${article.title}\n${article.description}\n${article.url}`
        //         )
        //         .join('\n\n');
        // }

        // const searchTerm = 'ai16z';

        // const currentNews = await getCurrentNews(searchTerm);

        _callback({
            text: helloworld
        })

        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "please say hello world in ascii", action: "HELLO_WORLD" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "HELLO_WORLD" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "I'd love to see a Hello World example.", action: "HELLO_WORLD" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "HELLO_WORLD" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Please display Hello World.", action: "HELLO_WORLD" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "HELLO_WORLD" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Show me a cool Hello World ASCII art.", action: "HELLO_WORLD" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "HELLO_WORLD" },
            },
        ],
    ] as ActionExample[][],
} as Action;
