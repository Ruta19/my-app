import React, { createContext, useState } from "react";

const MyContext = createContext({
    selectedTenant : "",
    setSelectedTenant: (tenant) => {}
});

export default MyContext;
