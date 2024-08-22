import { Service } from "@ixveria/stores";

export class ResponseService extends Service {
    public constructor(context: Service.LoaderContext, options: Service.Options) {
        super(context, {
            ...options,
            name: "response",
        });
    }
}
