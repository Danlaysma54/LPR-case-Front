export type path = {
    projectId : string;
    suiteId : string;
};

export type testCase= {
 testCaseId: String
 testCaseName: String
 suiteRootId: String 
}

export async function getOneLevelSuite({projectId,suiteId} : path) {
    const response = await fetch(
        `http://localhost:8080/${projectId}/${suiteId}/getOneLevel`,
    {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    },
);
return response.json();
}