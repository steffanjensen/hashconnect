import { Component, Inject, OnInit } from '@angular/core';
import { DialogBelonging } from '@costlydeveloper/ngx-awesome-popup';
import { TokenAssociateTransaction } from '@hashgraph/sdk';
import { Subscription } from 'rxjs';
import { HashconnectService } from 'src/app/services/hashconnect.service';

@Component({
    selector: 'app-associate-token',
    templateUrl: './associate-token.component.html',
    styleUrls: ['./associate-token.component.scss']
})
export class AssociateTokenComponent implements OnInit {

    constructor(
        @Inject('dialogBelonging') private dialogBelonging: DialogBelonging,
        public HashconnectService: HashconnectService,
    ) { }

    subscriptions: Subscription = new Subscription();

    tokenIds: { id: string}[] = [{ id: "0.0.3084461" }];
    signingAcct: string;

    ngOnInit(): void {
        this.subscriptions.add(
            this.dialogBelonging.EventsController.onButtonClick$.subscribe((_Button) => {
                if (_Button.ID === 'cancel') {
                    this.dialogBelonging.EventsController.close();
                }

                if (_Button.ID === 'send') {
                    this.send();
                }
            })
        );
    }

    addTokenId(){ 
        this.tokenIds.push({id: ""})
    }

    async send() {
        let trans = await new TokenAssociateTransaction();
        let tokenIds: string[] = [];

        this.tokenIds.forEach(token => {
            tokenIds.push(token.id);
        })

        trans.setTokenIds(tokenIds);

        this.HashconnectService.sendTransaction(trans, this.signingAcct);
    }

}
