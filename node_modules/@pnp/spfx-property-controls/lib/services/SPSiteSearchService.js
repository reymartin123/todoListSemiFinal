"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sp_http_1 = require("@microsoft/sp-http");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var SPPeopleSearchMockService_1 = require("./SPPeopleSearchMockService");
/**
 * Service implementation to search sites in SharePoint
 */
var SPSiteSearchService = (function () {
    function SPSiteSearchService() {
    }
    /**
     * Search sites from the SharePoint
     */
    SPSiteSearchService.prototype.searchSites = function (ctx, query) {
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return this.searchSitesFromMock(ctx, query);
        }
        else {
            var rootUrl = ctx.pageContext.web.absoluteUrl;
            if (ctx.pageContext.web.serverRelativeUrl !== "/") {
                rootUrl = ctx.pageContext.web.absoluteUrl.replace(ctx.pageContext.web.serverRelativeUrl, '');
            }
            // If the running env is SharePoint, loads from the search
            var userRequestUrl = ctx.pageContext.web.absoluteUrl + "/_api/search/query?querytext='contentclass:STS_Site contentclass:STS_Web Title:*" + query + "* Path:" + rootUrl + "*'&selectproperties='SiteId,Title,Path'&rowlimit=5";
            // Do the call against the SP REST API search endpoint
            return ctx.spHttpClient.get(userRequestUrl, sp_http_1.SPHttpClient.configurations.v1).then(function (searchResponse) {
                return searchResponse.json().then(function (sitesResponse) {
                    var res = [];
                    var values = sitesResponse.PrimaryQueryResult.RelevantResults.Table.Rows;
                    res = values.map(function (element) {
                        var site = {};
                        element.Cells.forEach(function (cell) {
                            switch (cell.Key) {
                                case 'Title':
                                    site.title = cell.Value;
                                    break;
                                case 'Path':
                                    site.url = cell.Value;
                                    break;
                                case 'SiteId':
                                    site.id = cell.Value;
                                    break;
                            }
                        });
                        return site;
                    });
                    return res;
                });
            });
        }
    };
    /**
     * Returns fake sites results for the Mock mode
     */
    SPSiteSearchService.prototype.searchSitesFromMock = function (ctx, query) {
        return SPPeopleSearchMockService_1.default.searchPeople(ctx.pageContext.web.absoluteUrl).then(function () {
            var results = [
                { title: 'Contoso Site', id: '611453e1-5b5d-45ec-94aa-a180a02df897', url: ctx.pageContext.web.absoluteUrl }
            ];
            return results;
        });
    };
    return SPSiteSearchService;
}());
exports.default = SPSiteSearchService;

//# sourceMappingURL=SPSiteSearchService.js.map
