import '/node_modules/od-paginator/paginator.js';
import '/framework/src/core/drivers/storage/IStorageInterface.js';
// mport '/framework/src/core/drivers/storage/RestDB.js';
// mport '/framework/src/core/drivers/storage/LocalStorage.js';
// mport '/framework/src/core/drivers/storage/Memory.js';
import '/framework/src/core/drivers/storage/CouchDB.js';


namespace `core.data` (
	@traits([new Observer]);
	class Repository {
        static get IRequestStorage(){
            var driver = this.prototype.device_driver;
            this.interface = this.interface||new NSRegistry[driver](this.prototype);
            this.device_driver=driver; 
            return this.interface;
        }

        static async add(obj,cb){
            var results = await this.IRequestStorage.add(obj,cb);
            return results;
        }

        static async all(cb){
            var results = await this.IRequestStorage.all(cb);
            return results;
        }

        static async remove(query,cb){
            return new Promise((resolve,reject) =>{
                this.IRequestStorage.remove((result, error)=>{
                    cb && cb(result, error);
                    resolve(result, error)
                },query)
            })
            return
            // var results = await this.IRequestStorage.remove(query);
            // return results;
        }


        static async find(cb,query){
            return new Promise((resolve,reject) =>{
                this.IRequestStorage.find((result, error)=>{
                    cb && cb(result, error);
                    resolve(result, error)
                },query)
            })
        }

        static isSeedable(){
            return this.prototype.seeds;
        }


        static onDataReceived (data, xhr){
            var self=this;
            data = this.onInitializeModelDataObjects(data);
            this.setData(data.table, data);
        }

        static setData (name,data){
            if(data && data.items){
                for(let obj of data.items){
                    this.add(obj, (res)=> {});
                    // this.constructor.prototype.push(obj)
                }
            }
        }

        static onInitializeModelDataObjects (data){
            /*var tablename = data.table;
            var items = data.items||[];
            for(var i=0; i<=items.length-1; i++) {
                var item = items[i];
                var Model = this['@datatype'];
                var modelObject = new Model(item);
                data.items.splice(i,1, modelObject);
            }
            ;*/
            return data;
        }

        static async seed (uri, params, force){
            if(!this.isSeedable()) {
                this.prototype.dispatchEvent("loaded", {controller: this}, this);
                return
            };
            force = (typeof force == "boolean") ? force:false;
            uri = uri || this.prototype.seeds;
            if(!this.loaded || force){
                this.loaded=true;
                /*var self=this;
                    params=params||{};
                    var oReq = new XMLHttpRequest();
                    oReq.overrideMimeType("text/plain");
                        oReq.addEventListener("load", function(){
                            if (this.readyState == 4 && (this.status == 200 || this.status == 0)) {
                                self.onDataReceived(JSON.parse(this.responseText))
                            }
                        });
                        oReq.open("GET", uri.dev, false);
                        oReq.send();*/


                //TODO:
                //fetch vs. xhr(above snippet)...why wasn't this just fetch in 1st place?
                await fetch(uri[Config.ENVIRONMENT]) 
                    .then(async res => this.onDataReceived(await res.json(), null))
                    .catch(e => console.log("Error in " +this.namespace +"#seed():\n", e))
                    .finally(_ => this.prototype.dispatchEvent("loaded", {controller: this}, this))
            } else {
                this.prototype.dispatchEvent("loaded", {controller: this}, this);
            }
        }
	}
);
