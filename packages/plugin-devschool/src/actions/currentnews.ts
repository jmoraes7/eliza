import {
    ActionExample,
    composeContext,
    Content,
    generateText,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
    type Action,
} from "@elizaos/core";

export const currentNewsAction: Action = {
    name: "CURRENT_NEWS",
    similes: [
        "NEWS",
        "GET_NEWS",
        "GET_CURRENT_NEWS"
    ],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true;
    },
    description:
        "Get the news for a search term if asked by a user",
    handler: async (
        _runtime: IAgentRuntime,
        _message: Memory,
        _state: State,
        _options: { [key: string]: unknown },
        _callback: HandlerCallback
    ): Promise<boolean> => {

        async function getCurrentNews(searchTerm: string) {
            const response = await fetch(
                `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=c105022044924acea8d93bb52b31ce46`
            )

            const data = await response.json();
            return data.articles
                .slice(0,5)
                .map(
                    (article) =>
                        `${article.title}\n${article.description}\n${article.url}`
                )
                .join('\n\n');
        }

        // TODO: extract the search term

        const context = `
        Extract the search term from the user's message. The message is:
        ${_message.content.text}
        Only respond with the search term. Do not include any other text.
        `

        const searchTerm = await generateText({
            runtime: _runtime,
            context: context,
            modelClass: ModelClass.SMALL,
            stop: ["\n"]
        })

        console.log("\n\nSEARCH TERM:", searchTerm, '\n\n')

        const currentNews = await getCurrentNews(searchTerm);

        const responseText = "The current news for search term " +
                searchTerm +
                " is " +
                currentNews;

        const newMemory: Memory = {
            userId: _message.agentId,
            agentId: _message.agentId,
            roomId: _message.roomId,
            content: {
                text: responseText,
                action: "CURRENT_NEWS_RESPONSE",
                source: _message.content?.source
            } as Content
        }

        await _runtime.messageManager.createMemory(newMemory);

        _callback(newMemory.content)

        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "What's the latest news on technology?", action: "CURRENT_NEWS" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "CURRENT_NEWS" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Can you update me on today's headlines?", action: "CURRENT_NEWS" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "CURRENT_NEWS" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Show me news about artificial intelligence.", action: "CURRENT_NEWS" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "CURRENT_NEWS" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "I need information on the latest market trends.", action: "CURRENT_NEWS" },
            },
            {
                user: "{{user2}}",
                content: { text: "", action: "CURRENT_NEWS" },
            },
        ],
    ] as ActionExample[][],
} as Action;
