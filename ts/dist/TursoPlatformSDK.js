"use strict";
// TursoPlatform Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.TursoPlatformSDK = exports.TursoPlatformEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const ApiTokenEntity_1 = require("./entity/ApiTokenEntity");
const AuditLogEntity_1 = require("./entity/AuditLogEntity");
const DatabaseEntity_1 = require("./entity/DatabaseEntity");
const DatabaseConfigurationEntity_1 = require("./entity/DatabaseConfigurationEntity");
const DatabaseStatEntity_1 = require("./entity/DatabaseStatEntity");
const DatabaseUsageEntity_1 = require("./entity/DatabaseUsageEntity");
const DeletedGroupEntity_1 = require("./entity/DeletedGroupEntity");
const GroupEntity_1 = require("./entity/GroupEntity");
const GroupConfigurationEntity_1 = require("./entity/GroupConfigurationEntity");
const InstanceEntity_1 = require("./entity/InstanceEntity");
const InviteEntity_1 = require("./entity/InviteEntity");
const LocationEntity_1 = require("./entity/LocationEntity");
const MemberEntity_1 = require("./entity/MemberEntity");
const OrganizationEntity_1 = require("./entity/OrganizationEntity");
const OrganizationInvoiceEntity_1 = require("./entity/OrganizationInvoiceEntity");
const OrganizationPlanEntity_1 = require("./entity/OrganizationPlanEntity");
const OrganizationSubscriptionEntity_1 = require("./entity/OrganizationSubscriptionEntity");
const OrganizationUsageEntity_1 = require("./entity/OrganizationUsageEntity");
const UserEntity_1 = require("./entity/UserEntity");
const ValidateEntity_1 = require("./entity/ValidateEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const TursoPlatformEntityBase_1 = require("./TursoPlatformEntityBase");
Object.defineProperty(exports, "TursoPlatformEntityBase", { enumerable: true, get: function () { return TursoPlatformEntityBase_1.TursoPlatformEntityBase; } });
const Utility_1 = require("./utility/Utility");
const ResultBodyUtility_1 = require("./utility/ResultBodyUtility");
const MakeRequestUtility_1 = require("./utility/MakeRequestUtility");
const PrepareMethodUtility_1 = require("./utility/PrepareMethodUtility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class TursoPlatformSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        for (const key of ['_options', '_rootctx', '_features']) {
            Object.defineProperty(this, key, {
                value: this[key], enumerable: false, writable: true, configurable: true
            });
        }
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const method = String(fetchargs.method || 'GET').toUpperCase();
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.method, method)) {
            return ctx.error('spec_method_allow', 'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + options.allow.method + '"');
        }
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method,
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!(0, PrepareMethodUtility_1.allowed)(this._options.allow.op, 'direct')) {
            return {
                ok: false,
                err: new Error('TursoPlatformSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return { ok: false, err: utility.clean(this._rootctx, fetchdef) };
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            if (true === fetchdef.signal?.aborted) {
                throw fetchdef.signal.reason;
            }
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, fetched)) };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            let err = undefined;
            if (!noBody) {
                let text = undefined;
                try {
                    const raw = fetched;
                    if ('function' === typeof raw.text) {
                        text = await raw.text();
                        json = '' === text.trim() ? undefined : JSON.parse(text);
                    }
                    else {
                        json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                    }
                }
                catch (parseErr) {
                    if ('SyntaxError' !== parseErr?.name) {
                        throw parseErr;
                    }
                    err = (0, ResultBodyUtility_1.unreadableBody)(ctx, {
                        status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
                        failed: 200 <= status && status < 300 ? undefined :
                            ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
                    });
                }
            }
            return {
                ok: null == err && status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
                ...(null == err ? {} : { err: utility.clean(ctx, err) }),
            };
        }
        catch (err) {
            return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, err)) };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.op, 'graphql')) {
            return {
                ok: false,
                err: new Error('TursoPlatformSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('TursoPlatformSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.ApiToken().list()` / `client.ApiToken().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiToken(entopts) {
        const self = this;
        return new ApiTokenEntity_1.ApiTokenEntity(self, entopts);
    }
    // Entity access: `client.AuditLog().list()` / `client.AuditLog().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AuditLog(entopts) {
        const self = this;
        return new AuditLogEntity_1.AuditLogEntity(self, entopts);
    }
    // Entity access: `client.Database().list()` / `client.Database().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Database(entopts) {
        const self = this;
        return new DatabaseEntity_1.DatabaseEntity(self, entopts);
    }
    // Entity access: `client.DatabaseConfiguration().list()` / `client.DatabaseConfiguration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DatabaseConfiguration(entopts) {
        const self = this;
        return new DatabaseConfigurationEntity_1.DatabaseConfigurationEntity(self, entopts);
    }
    // Entity access: `client.DatabaseStat().list()` / `client.DatabaseStat().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DatabaseStat(entopts) {
        const self = this;
        return new DatabaseStatEntity_1.DatabaseStatEntity(self, entopts);
    }
    // Entity access: `client.DatabaseUsage().list()` / `client.DatabaseUsage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DatabaseUsage(entopts) {
        const self = this;
        return new DatabaseUsageEntity_1.DatabaseUsageEntity(self, entopts);
    }
    // Entity access: `client.DeletedGroup().list()` / `client.DeletedGroup().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeletedGroup(entopts) {
        const self = this;
        return new DeletedGroupEntity_1.DeletedGroupEntity(self, entopts);
    }
    // Entity access: `client.Group().list()` / `client.Group().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Group(entopts) {
        const self = this;
        return new GroupEntity_1.GroupEntity(self, entopts);
    }
    // Entity access: `client.GroupConfiguration().list()` / `client.GroupConfiguration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GroupConfiguration(entopts) {
        const self = this;
        return new GroupConfigurationEntity_1.GroupConfigurationEntity(self, entopts);
    }
    // Entity access: `client.Instance().list()` / `client.Instance().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Instance(entopts) {
        const self = this;
        return new InstanceEntity_1.InstanceEntity(self, entopts);
    }
    // Entity access: `client.Invite().list()` / `client.Invite().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Invite(entopts) {
        const self = this;
        return new InviteEntity_1.InviteEntity(self, entopts);
    }
    // Entity access: `client.Location().list()` / `client.Location().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Location(entopts) {
        const self = this;
        return new LocationEntity_1.LocationEntity(self, entopts);
    }
    // Entity access: `client.Member().list()` / `client.Member().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Member(entopts) {
        const self = this;
        return new MemberEntity_1.MemberEntity(self, entopts);
    }
    // Entity access: `client.Organization().list()` / `client.Organization().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Organization(entopts) {
        const self = this;
        return new OrganizationEntity_1.OrganizationEntity(self, entopts);
    }
    // Entity access: `client.OrganizationInvoice().list()` / `client.OrganizationInvoice().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationInvoice(entopts) {
        const self = this;
        return new OrganizationInvoiceEntity_1.OrganizationInvoiceEntity(self, entopts);
    }
    // Entity access: `client.OrganizationPlan().list()` / `client.OrganizationPlan().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationPlan(entopts) {
        const self = this;
        return new OrganizationPlanEntity_1.OrganizationPlanEntity(self, entopts);
    }
    // Entity access: `client.OrganizationSubscription().list()` / `client.OrganizationSubscription().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationSubscription(entopts) {
        const self = this;
        return new OrganizationSubscriptionEntity_1.OrganizationSubscriptionEntity(self, entopts);
    }
    // Entity access: `client.OrganizationUsage().list()` / `client.OrganizationUsage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationUsage(entopts) {
        const self = this;
        return new OrganizationUsageEntity_1.OrganizationUsageEntity(self, entopts);
    }
    // Entity access: `client.User().list()` / `client.User().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    User(entopts) {
        const self = this;
        return new UserEntity_1.UserEntity(self, entopts);
    }
    // Entity access: `client.Validate().list()` / `client.Validate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Validate(entopts) {
        const self = this;
        return new ValidateEntity_1.ValidateEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new TursoPlatformSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return TursoPlatformSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'TursoPlatform' };
    }
    toString() {
        return 'TursoPlatform ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.TursoPlatformSDK = TursoPlatformSDK;
const SDK = TursoPlatformSDK;
exports.SDK = SDK;
//# sourceMappingURL=TursoPlatformSDK.js.map